import sql_helper


def generate_specialty_form():
    place_holder_schema = {
        "type": "object",
        "required":["alias", "specialty"],
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
                      x in sql_helper.run_query("select distinct(specialty) "
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
                    sql_helper.run_query("SELECT program_name from programs WHERE specialty='%s'" % specialty)]
    program_list.sort()
    place_holder_schema['properties']['listOfStrings']['items']['enum'] = program_list
    schema = place_holder_schema
    return schema


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

