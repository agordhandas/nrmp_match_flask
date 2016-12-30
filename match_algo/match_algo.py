__author__ = 'Ankit'

from match_classes import Applicants
from match_classes import tempMatchBuffer
import pickle

def run_algo(applicant_rankings, program_list):
    applicants_class = Applicants(applicant_rankings)
    program_class = tempMatchBuffer(program_list)

    #Grab user info and attach their Rank Order List
    user_info = pickle.load (open ('match_data/basic_info.p', 'rb'))
    alias = user_info['alias']
    applicants_class.add_applicant(alias)
    rank_order_list = pickle.load (open ('match_data/rank_order_list.p', 'rb'))
    applicants_class.modify_applicant_rankings(alias, rank_order_list)
    #print applicants_class.applicantRankingList(alias)

    #Grab estimated program ranking and add to program_class
    program_rankings = pickle.load (open ('match_data/program_rankings.p', 'rb'))
    for program,rank in program_rankings.iteritems():
      program_class.insert_candidate_rank (program, alias, rank)

    while not applicants_class.isEmpty():
        applicant = applicants_class.pop()
        for program in applicants_class.applicantRankingList(applicant):
            if program_class.didProgramRank(program, applicant):
                lower_candidate = program_class.lowerRankedCandidate(program, applicant)
                if program_class.checkProgramHasSpace(program):
                    program_class.tempMatch(program, applicant)
                    #print "Applicant %s temporarily matched to %s" % (applicant, program)
                    break
                elif lower_candidate:
                    program_class.unseatCandidate(program, lower_candidate)
                    applicants_class.reinsertApplicant(lower_candidate)
                    program_class.tempMatch(program, applicant)
                    """print "Applicant %s (ranked %d) unseats %s (ranked %d) at %s" % (applicant,
                                                                                     program_class.positionOfApplicant(program, applicant) + 1,
                                                                                     lower_candidate,
                                                                                     program_class.positionOfApplicant(program, lower_candidate) + 1,
                                                                                     program)"""
                    break
    results_dictionary = {'results': program_class.match_buffer,
                          'applicants': applicant_rankings,
                          'programs': program_list}
    pickle.dump(results_dictionary, open('match_results.p', 'wb'))
    return program_class.match_buffer

