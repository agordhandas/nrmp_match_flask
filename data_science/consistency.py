__author__ = 'AnkitAthos'


def consistency(results, program):
    consistency_array = []
    for length in range(len(results)):
        results_under_con = results[:length]
        instances_program = sum([1 for x in results_under_con if x == program])
        chances_program = float(instances_program) / (length + 1) * 100
        consistency_array.append(chances_program)
    return consistency_array