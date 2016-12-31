__author__ = 'Ankit'


def run_algo(applicants_class, program_class):
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

    return program_class.match_buffer

