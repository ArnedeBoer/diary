export const itemsInfo = {
  pages: {
    filters: {
      dateStart: {
        type: 'date',
        label: 'Date Start'
      },
      dateEnd: {
        type: 'date',
        label: 'Date End'
      },
      people: {
        type: 'select',
        label: 'People',
        placeholder: 'Bob, Mary, ...'
      },
      locations: {
        type: 'select',
        label: 'Location',
        placeholder: 'Cafe Bax, Cafe Lennep, ...'
      }
    },
    fields: {
      date: {
        type: 'date',
        label: 'Date',
        required: true
      },
      description: {
        type: 'textarea',
        label: 'Description',
        placeholder: 'A description...'
      },
      people: {
        type: 'select',
        label: 'People',
        placeholder: 'Bob, Mary, ...'
      },
      locations: {
        type: 'select',
        label: 'Location',
        placeholder: 'Cafe Bax, Cafe Lennep, ...',
      }
    },
    itemFields: {
      date: {
        type: 'date',
        label: 'Date',
        required: true
      },
      description: {
        type: 'textarea',
        label: 'Description',
        placeholder: 'A description...'
      },
      people: {
        type: 'select',
        label: 'People',
        placeholder: 'Bob, Mary, ...'
      },
      locations: {
        type: 'select',
        label: 'Location',
        placeholder: 'Cafe Bax, Cafe Lennep, ...'
      }
    }
  },
  people: {
    filters: {
      name: {
        type: 'text',
        label: 'Name',
        placeholder: 'Bob, Mary, ...'
      }
    },
    fields: {
      name: {
        type: 'text',
        label: 'Name',
        placeholder: 'Bob, Mary, ...',
        required: true
      },
      description: {
        type: 'textarea',
        label: 'Description',
        placeholder: 'A description...'
      }
    },
    itemFields: {
      name: {
        type: 'text',
        label: 'Name',
        placeholder: 'Bob, Mary, ...',
        required: true
      },
      description: {
        type: 'textarea',
        label: 'Description',
        placeholder: 'A description...'
      }
    }
  },
  locations: {
    filters: {
      name: {
        type: 'text',
        label: 'Name',
        placeholder: 'Cafe Bax, Cafe Lennep, ...'
      },
    },
    fields: {
      name: {
        type: 'text',
        label: 'Name',
        placeholder: 'Cafe Bax, Cafe Lennep, ...',
        required: true
      },
      description: {
        type: 'textarea',
        label: 'Description',
        placeholder: 'A description...'
      }
    },
    itemFields: {
      name: {
        type: 'text',
        label: 'Name',
        placeholder: 'Cafe Bax, Cafe Lennep, ...',
        required: true
      },
      description: {
        type: 'textarea',
        label: 'Description',
        placeholder: 'A description...'
      }
    }
  }
};

export const itemTypes = Object.keys(itemsInfo);
