import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import DocPage from 'react-doc-page';
import DatePickerExamples from './DatePickerExamples';
import DatePickerExamplesRaw from '!!raw!./DatePickerExamples';
import DatePicker from './DatePickerDocgen.json';
DatePicker[0].props.DateTimeFormat.defaultValue = {
  computed: false,
  value: `Intl.DateTimeFormat || (locales, options) => { format: date => date }`,
};

const text = `
Pickers provide a simple way to select a single value from a pre-determined set.
Date pickers should be formatted to the users's locale.
`;

export default class DatePickerDocs extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        text={text}
        sectionName="Date Pickers"
        examples={[{
          code: DatePickerExamplesRaw,
          children: <DatePickerExamples />,
        }]}
        docgens={DatePicker}
      />
    );
  }
}
