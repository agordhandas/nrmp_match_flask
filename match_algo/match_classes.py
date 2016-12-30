__author__ = 'AnkitGordhandas'

from random import shuffle
class Applicants:
    """
    example of applicant ranking dictionary:
    {'Jack': ['UCSF',
              'UFlorida',
              'Yale',
              'MGH',
              'WashU',
              'Alabama',
              'Howard',
              'USC'],
     'Jill': ['MGH',
              'UWash',
              'Stanford']
    }
    """
    def __init__(self, applicants_rankings):
        self.applicant_rankings = applicants_rankings
        self.applicants = (self.applicant_rankings.keys())
        _ignore = shuffle (self.applicants)

    def isEmpty(self):
        return self.applicants == []

    def pop(self):
        return self.applicants.pop()

    def reinsertApplicant(self, applicant):
        if applicant in self.applicant_rankings.keys():
            self.applicants.insert(0, applicant)
        else:
            print "%s does not have rankings associated" %(applicant)

    def applicantRankingList(self, applicant):
        return self.applicant_rankings[applicant]

    def add_applicant (self, applicant_name):
        self.applicants.append(applicant_name)

    def modify_applicant_rankings (self, applicant_name, applicant_rankings):
        self.applicant_rankings[applicant_name] = applicant_rankings


class tempMatchBuffer:
    def __init__(self, program_list):
        """Example program_list:
        {'MGH': {'positions': 5,
                 'rankings': ['Jack', 'John', 'Jill', 'Ken', 'Chris']},
         'Stanford': {'positions': 3,
                      'rankings': ['Ryan', 'Jack', 'Olga', 'Mark', 'Christine', 'Ken']}
        }
        """
        self.program_list = program_list
        self.match_buffer = {program:[] for program in program_list.keys()}

    def checkProgramHasSpace(self, program):
        return len(self.match_buffer[program]) < self.program_list[program]['positions']

    def tempMatch(self, program, applicant):
        self.match_buffer[program].append(applicant)

    def didProgramRank(self, program, applicant):
        return applicant in self.program_list[program]['rankings']

    def positionOfApplicant(self, program, applicant):
        return self.program_list[program]['rankings'].index(applicant)

    def lowerRankedCandidate(self, program, applicant):
        matched_applicant_ranks = {matched_applicant: self.positionOfApplicant(program, matched_applicant) for matched_applicant in self.match_buffer[program]}
        this_applicant_rank = self.positionOfApplicant(program, applicant)

        if any([this_applicant_rank < x for x in matched_applicant_ranks.values()]):
            lowest_rank_candidate = [key for key,value in matched_applicant_ranks.iteritems() if value == max(matched_applicant_ranks.values())][0]
        else:
            lowest_rank_candidate = ''
        return lowest_rank_candidate

    def insert_candidate_rank (self, program, applicant, rank):
        self.program_list[program]['rankings'].insert(rank - 1, applicant)

    def remove_candidate(self, program, applicant):
        self.program_list[program]['rankings'].remove(applicant)

    def edit_candidate_rank(self, program, applicant, new_rank):
        self.remove_candidate(program, applicant)
        self.insert_candidate_rank(program, applicant, new_rank)

    def unseatCandidate (self, program, applicant):
        if applicant in self.match_buffer[program]:
            self.match_buffer[program].remove(applicant)
        else:
            print "%s has not been matched to %s" % (applicant, program)








