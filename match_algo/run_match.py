import match_algo
from match_classes import Applicants
from match_classes import tempMatchBuffer
from helpers import sql_helper
import random


def run_match_simulation(user_info, rank_order_list, estimated_program_rankings):

    #TODO: basic_info->specialty->programs
    #TODO: specialty -> number of applicants
    programs = [x[0] for x in sql_helper.run_query("select program_name FROM "
                                                   "programs WHERE specialty='%s';" % user_info['specialty'])]
    number_of_applicants = [x[0] for x in sql_helper.run_query("select applicants "
                                                               "FROM number_of_positions "
                                                               "WHERE specialty='%s';" % user_info['specialty'])][0]
    applicants = ['appl_' + str(x) for x in range(number_of_applicants)]

    #TODO: avg. number of positions -> number of candidates invited -> number of candidates ranked
    total_positions = [x[0] for x in sql_helper.run_query("select total_positions "
                                                          "FROM number_of_positions "
                                                          "WHERE specialty='%s';" % user_info['specialty'])][0]
    avg_number_of_positions = total_positions / len(programs) + 1
    number_of_interviews = avg_number_of_positions * 12
    number_of_ranks = avg_number_of_positions*6

    #Each program invites 40 to 60 students from a group of 70 students
    invited_applicants = {program: [applicants[x] for
                                    x in list(set(random.sample(range(0, number_of_applicants),
                                                                    random.randint(int(number_of_interviews * 0.8),
                                                                                   int(number_of_interviews * 1.2)))))]
                          for program in programs}

    # Each program randomly ranks between 15 and 25 of the candidates it interviews
    ranked_applicants = {program: ([invited_applicants[program][x] for
                                    x in list(set(random.sample(range(len(invited_applicants[program])),
                                                                    random.randint(int(number_of_ranks * 0.9),
                                                                                   int(number_of_ranks * 1.1)))))])
                         for program in programs}
    _ignore = {program: random.shuffle(ranked_applicants[program]) for program in programs}

    #make a list of programs that each applicant interviewed at, and randomize it (to give a 'rank order list')
    applicant_rankings = {applicant: ([program for program in programs if applicant in invited_applicants[program]])
                          for applicant in applicants}
    _ignore = {applicant: random.shuffle(applicant_rankings[applicant]) for applicant in applicants}

    program_list = {program: {'positions': random.randint(2, 8),
                              'rankings': ranked_applicants[program]}
                    for program in programs}

    applicants_class = Applicants(applicant_rankings)
    program_class = tempMatchBuffer(program_list)

    alias = user_info['alias']
    applicants_class.add_applicant(alias)
    applicants_class.modify_applicant_rankings(alias, rank_order_list)

    #Grab estimated program ranking and add to program_class
    for program, rank in estimated_program_rankings.iteritems():
        program_class.insert_candidate_rank (program, alias, rank)

    a = match_algo.run_algo(applicants_class, program_class)

    return a


def run_match(user_info, rank_order_list, estimated_program_rankings, number_of_simulations=200):
    #Run simulation set number of times
    simulation_results = []
    for i in range(number_of_simulations):
        a = run_match_simulation(user_info, rank_order_list, estimated_program_rankings)
        matched_program_list = [program for program in a.keys() if user_info['alias'] in a[program]]
        if matched_program_list:
            simulation_results.append(matched_program_list[0])
        else:
            simulation_results.append('None')

    #Get the most common result
    unique_results = list(set(simulation_results))
    result_count = {program: 0 for program in unique_results}
    for program in simulation_results:
        result_count.update({program:result_count[program] + 1})
    return result_count