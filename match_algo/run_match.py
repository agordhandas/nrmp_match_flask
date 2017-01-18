import match_algo
from match_classes import Applicants
from match_classes import tempMatchBuffer
from helpers import sql_helper
import random
import time
from multiprocessing import Pool


def run_match_simulation(args):

    user_info = args[0]
    rank_order_list = args[1]
    estimated_program_rankings = args[2]
    programs = args[3]
    number_of_applicants = args[4]
    total_positions = args[5]

    """user_info = args['user_info']
    rank_order_list = args['rank_order_list']
    estimated_program_rankings = args['estimated_program_rankings']
    programs = args['programs']
    number_of_applicants = args['number_of_applicants']
    total_positions = args['total_positions']"""

    t = time.time()

    #print "checkpoint #1: %s" % (time.time() - t)
    applicants = ['appl_' + str(x) for x in range(number_of_applicants)]
    avg_number_of_positions = total_positions / len(programs) + 1
    number_of_interviews = avg_number_of_positions * 12
    number_of_ranks = avg_number_of_positions * 6
    #print "checkpoint #2: %s" % (time.time() - t)
    #Each program invites 40 to 60 students from a group of 70 students
    invited_applicants = {program: [applicants[x] for
                                    x in list(set(random.sample(range(0, number_of_applicants),
                                                                    random.randint(int(number_of_interviews * 0.8),
                                                                                   int(number_of_interviews * 1.2)))))]
                          for program in programs}
    #print "checkpoint 3: %s" % (time.time() - t)

    # Each program randomly ranks between 15 and 25 of the candidates it interviews
    ranked_applicants = {program: ([invited_applicants[program][x] for
                                    x in list(set(random.sample(range(len(invited_applicants[program])),
                                                                    random.randint(int(number_of_ranks * 0.9),
                                                                                   int(number_of_ranks * 1.1)))))])
                         for program in programs}
    _ignore = {program: random.shuffle(ranked_applicants[program]) for program in programs}
    #print "checkpoint #4: %s" % (time.time() - t)

    #make a list of programs that each applicant interviewed at, and randomize it (to give a 'rank order list')
    #applicant_rankings = {applicant: [program for program in programs if applicant in invited_applicants[program]]
     #                     for applicant in applicants}
    applicant_rankings = invert_dol_nonunique(invited_applicants)
    _ignore = {applicant: random.shuffle(applicant_rankings[applicant]) for applicant in applicant_rankings}
    #print "checkpoint #5: %s" % (time.time() - t)

    program_list = {program: {'positions': random.randint(2, 8),
                              'rankings': ranked_applicants[program]}
                    for program in programs}


    applicants_class = Applicants(applicant_rankings)
    program_class = tempMatchBuffer(program_list)
    #print "checkpoint #6: %s" % (time.time() - t)
    alias = user_info['alias']
    applicants_class.add_applicant(alias)
    applicants_class.modify_applicant_rankings(alias, rank_order_list)

    #Grab estimated program ranking and add to program_class
    for program, rank in estimated_program_rankings.iteritems():
        program_class.insert_candidate_rank (program, alias, rank)
    #print "checkpoint #7: %s" % (time.time() - t)
    a = match_algo.run_algo(applicants_class, program_class)
    #print "checkpoint #8: %s" % (time.time() - t)
    matched_program_list = [program for program in a.keys() if user_info['alias'] in a[program]]
    if matched_program_list:
        return matched_program_list[0]
    else:
        return 'None'

    #return a


def run_match(user_info, rank_order_list, estimated_program_rankings, number_of_simulations=200):
    programs = [x[0] for x in sql_helper.run_query("select program_name FROM "
                                                   "programs WHERE specialty='%s';" % user_info['specialty'])]
    number_of_applicants = [x[0] for x in sql_helper.run_query("select applicants "
                                                               "FROM number_of_positions "
                                                               "WHERE specialty='%s';" % user_info['specialty'])][0]
    total_positions = [x[0] for x in sql_helper.run_query("select total_positions "
                                                          "FROM number_of_positions "
                                                          "WHERE specialty='%s';" % user_info['specialty'])][0]
    #Run simulation set number of times
    #simulation_results = [''] * number_of_simulations
    my_pool = Pool(10)
    args = [user_info,
            rank_order_list,
            estimated_program_rankings,
            programs,
            number_of_applicants,
            total_positions]
    simulation_results = my_pool.map(run_match_simulation, [args]*number_of_simulations)
    #print simulation_results
    """for i in range(number_of_simulations):
        match = run_match_simulation({'user_info': user_info,
                                      'rank_order_list': rank_order_list,
                                      'estimated_program_rankings': estimated_program_rankings,
                                      'programs': programs,
                                      'number_of_applicants': number_of_applicants,
                                      'total_positions': total_positions})
        simulation_results[i] = match"""

    #Get the most common result
    unique_results = list(set(simulation_results))
    result_count = {program: 0 for program in unique_results}
    for program in simulation_results:
        result_count.update({program:result_count[program] + 1})
    return result_count


def invert_dol_nonunique(d):
    newdict = {}
    for k in d:
        for v in d[k]:
            newdict.setdefault(v, []).append(k)
    return newdict


if __name__ == "__main__":
    user_info = {"alias": "ag",
                 "specialty": "Internal Medicine"}
    rank_order_list = ["Abbott-Northwestern Hospital Program",
                       "Abington Memorial Hospital Program",
                       "Advocate Health Care (Advocate Illinois Masonic Medical Center) Program",
                       "Allegiance Health Program"]
    estimated_program_rankings = {"Advocate Health Care (Advocate Illinois Masonic Medical Center) Program": 5,
                                  "Abington Memorial Hospital Program": 21,
                                  "Allegiance Health Program": 6,
                                  "Abbott-Northwestern Hospital Program": 12}
    a = run_match(user_info, rank_order_list, estimated_program_rankings, number_of_simulations=200)

    print a