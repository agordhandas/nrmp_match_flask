import sql_helper_match


def generate_specialty_form():
    place_holder_schema = {
        "type": "object",
        "required":[],
        "properties": {
            "alias": {
                "type": "string",
                "title": "Nickname"
            },
            "specialty": {
                "type": "string",
                "title": "Specialty",
                "enum": []
            }
        }
    }
    specialty_list = [x[0] for
                      x in sql_helper_match.run_query("select distinct(specialty) "
                                                "FROM programs WHERE programs.specialty "
                                                "in (SELECT specialty FROM number_of_positions);")]
    specialty_list.sort()
    place_holder_schema['properties']['specialty']['enum'] = specialty_list
    return place_holder_schema


def generate_rol_form(specialty):
    place_holder_schema = {
        "type": "object",
        "properties": {
            "listOfStrings": {
                "type": "array",
                "title": "",
                "items": {
                    "type": "string",
                    "enum": []
                }
            }
        }
    }

    program_list = [x[0] for x in
                    sql_helper_match.run_query("SELECT program_name from programs WHERE specialty='%s'" % specialty)]
    program_list.sort()
    place_holder_schema['properties']['listOfStrings']['items']['enum'] = program_list
    schema = place_holder_schema
    return program_list


def generate_program_form(programs):
    place_holder_schema = {
        "type": "object",
        "title": "",
        "properties": {

        }
    }
    uischema = {"ui:order": programs}
    properties_dict = {key: {'title': key, 'type': 'integer'} for key in programs}
    place_holder_schema['properties'] = properties_dict
    schema = place_holder_schema
    return {'schema': schema, 'ui': uischema}


def generate_table(match_results_dict):
    match_results = [[key, value] for key, value in match_results_dict.iteritems()] #tuple
    table_frame = """<table>
                        <tr>
                            <th>Program</th>
                            <th>Chances</th>
                        </tr>
                    </table>"""
    for entry in match_results:
        table_frame = table_frame +  ("""<tr><td>%s</td><td>%s</td></tr>""") % (entry[0], str(float(entry[1])/sum(match_results_dict.values())*100))
    return table_frame