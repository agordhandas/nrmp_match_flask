__author__ = 'Ankit'
import gc
import time


def run_algo(applicants_class, program_class):
    while not applicants_class.isEmpty():
        #print "checkpoint #1: %s" % (time.time() - t)

        applicant = applicants_class.pop()
        for program in applicants_class.applicantRankingList(applicant):
            if program_class.didProgramRank(program, applicant):
                lower_candidate = program_class.lowerRankedCandidate(program, applicant)
                #print "checkpoint #2: %s" % (time.time() - t)
                if program_class.checkProgramHasSpace(program):
                    program_class.tempMatch(program, applicant)
                    #print "checkpoint #3: %s" % (time.time() - t)
                    #print "Applicant %s temporarily matched to %s" % (applicant, program)
                    break
                elif lower_candidate:
                    program_class.unseatCandidate(program, lower_candidate)
                    applicants_class.reinsertApplicant(lower_candidate)
                    program_class.tempMatch(program, applicant)
                    #print "checkpoint #4: %s" % (time.time() - t)
                    break
    return program_class.match_buffer

