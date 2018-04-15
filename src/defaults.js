export const pageFields = [
    {
        name: 'date',
        title: 'Date',
        type: 'date',
        required: true
    },
    {
        name: 'text',
        title: 'Description',
        placeholder: 'Dear diary...',
        type: 'textarea',
        required: true
    },
    {
        name: 'people',
        title: 'People',
        type: 'select',
        placeholder: 'Bob, Chris, ...',
        list: 'people-list',
        filter: true
    },
    {
        name: 'locations',
        title: 'Locations',
        type: 'select',
        placeholder: 'Cafe Bax, Cafe Lennep, ...',
        list: 'location-list',
        filter: true
    }
];

export const supportFields = [
    {
        name: 'name',
        title: 'Name',
        placeholder: 'Name',
        type: 'text',
        required: true,
        filter: true
    },
    {
        name: 'text',
        title: 'Description',
        placeholder: 'What I like about...',
        type: 'textarea'
    }
]

const initialFilters = [
    {
        name: 'dateStart',
        title: 'Date start',
        type: 'date'
    },
    {
        name: 'dateEnd',
        title: 'Date end',
        type: 'date'
    }
];

const pageFilters = initialFilters.concat(pageFields.filter(field => field.filter));
const supportFilters = supportFields.filter(field => field.filter);

export const pages = [
    {
        name: 'pages',
        filters: pageFilters,
        fields: pageFields
    },
    {
        name: 'people',
        filters: supportFilters,
        fields: supportFields
    },
    {
        name: 'locations',
        filters: supportFilters,
        fields: supportFields
    }
];

export const pageNames = pages.map(page => {
    return page.name;
})