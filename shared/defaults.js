(function(exports){
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const main = 'pages';
  const relations = {
    people: 'Bob, Mary, ...',
    locations: 'Cafe Bax, Cafe Lennep, ...',
    type: 'Holiday, Kingsday, ...',
    country: 'The Netherlands, Vietnam, ...'
  };

  const createField = (type, label, placeholder, required) => ({type, label, placeholder, required});
  const createName = (placeholder, required) => createField('text', 'Name', placeholder, required);
  const createDate = (label, required) => createField('date', label, undefined, required);
  const createDescription = () => createField('textarea', 'Description', 'A description...', false);
  const createRelation = (name, placeholder) => createField('select', capitalize(name), placeholder, false);
  const createSections = ({filters, fields}) => ({
      filterFields: filters,
      fields: JSON.parse(JSON.stringify(fields)),
      itemFields: JSON.parse(JSON.stringify(fields))
    });

  const mainFields = {
    filters: {
      dateStart: createDate('Date Start', false),
      dateEnd: createDate('Date End', false)
    },
    fields: {
      date: createDate('Date', true),
      description: createDescription()
    }
  };
  const getRelationFields = placeholder => ({
    filters: {
      name: createName(placeholder, false)
    },
    fields: {
      name: createName(placeholder, true),
      description: createDescription()
    }
  });

  // set the main itemType, with its sections, with its basic fields
  const defaults = {
    [main]: createSections(mainFields)
  };

  // add the relation fields to the sections of the itemType
  Object.keys(defaults[main]).forEach(section => {
    Object.keys(relations).forEach(relation => {
      const placeholder = relations[relation];

      defaults[main][section][relation] = createRelation(relation, placeholder);
    });
  });

  // set the relation itemTypes, with their sections, with their basic fields
  Object.keys(relations).forEach(relation => {
    const placeholder = relations[relation]
    const relationFields = getRelationFields(placeholder);

    defaults[relation] = createSections(relationFields);
  });

  // exports
  exports.mainName = main;
  exports.relationNames = Object.keys(relations);
  exports.itemsInfo = defaults;
  exports.itemTypes = Object.keys(defaults);

}(typeof exports === 'undefined' ? this.share = {} : exports));
