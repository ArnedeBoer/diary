(function(exports){

  const mainDefaults = {
    pages: {
      filterFields: {
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
        },
        type: {
          type: 'select',
          label: 'Type',
          placeholder: 'Holiday, Kingsday, ...'
        },
        country: {
          type: 'select',
          label: 'Country',
          placeholder: 'The Netherlands, Vietnam, ...'
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
        },
        type: {
          type: 'select',
          label: 'Type',
          placeholder: 'Holiday, Kingsday, ...'
        },
        country: {
          type: 'select',
          label: 'Country',
          placeholder: 'The Netherlands, Vietnam, ...'
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
        },
        type: {
          type: 'select',
          label: 'Type',
          placeholder: 'Holiday, Kingsday, ...'
        },
        country: {
          type: 'select',
          label: 'Country',
          placeholder: 'The Netherlands, Vietnam, ...'
        }
      }
    }
  };

  const relationDefaults = {
    people: {
      filterFields: {
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
      filterFields: {
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
    },
    type: {
      filterFields: {
        name: {
          type: 'text',
          label: 'Name',
          placeholder: 'Holiday, Kingsday, ...'
        }
      },
      fields: {
        name: {
          type: 'text',
          label: 'Name',
          placeholder: 'Holiday, Kingsday, ...',
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
          placeholder: 'Holiday, Kingsday, ...',
          required: true
        },
        description: {
          type: 'textarea',
          label: 'Description',
          placeholder: 'A description...'
        }
      }
    },
    country: {
      filterFields: {
        name: {
          type: 'text',
          label: 'Name',
          placeholder: 'The Netherlands, Vietnam, ...'
        }
      },
      fields: {
        name: {
          type: 'text',
          label: 'Name',
          placeholder: 'The Netherlands, Vietnam, ...',
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
          placeholder: 'The Netherlands, Vietnam, ...',
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

  exports.mainName = Object.keys(mainDefaults)[0];
  exports.relationNames = Object.keys(relationDefaults);
  exports.itemsInfo = Object.assign(mainDefaults, relationDefaults);
  exports.itemTypes = [exports.mainName].concat(exports.relationNames);

}(typeof exports === 'undefined' ? this.share = {} : exports));
