import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import loremIpsum from 'lorem-ipsum';

import Section from './Section';
import { randomImage, randomImages, getRandomInt } from '../../utils';

const releasesData = [{
  title: 'In a Perfect World',
  subtitle: 'Kodaline',
}, {
  title: 'Native',
  subtitle: 'One Republic',
}];

const recommendedData = [{
  title: loremIpsum({ count: 2, units: 'words' }),
  subtitle: loremIpsum({ count: 1, units: 'words' }),
}, {
  title: loremIpsum({ count: 1, units: 'words' }),
  subtitle: loremIpsum({ count: 2, units: 'words' }),
}, {
  title: loremIpsum({ count: 2, units: 'words' }),
  subtitle: loremIpsum({ count: 3, units: 'words' }),
}];

const imgs = randomImages(releasesData.length + recommendedData.length, { width: 140 });
releasesData.forEach((datum, i) => {
  datum.img = imgs[i];
});
recommendedData.forEach((datum, i) => {
  datum.img = imgs[i + releasesData.length];
});

const loremTitle = loremIpsum({ count: 2, units: 'words' });
const lorems = Array.apply(null, new Array(8)).map((_, i) => ({
  title: loremIpsum({ count: getRandomInt({ min: 1, max: 3 }), units: 'words' }),
  subtitle: loremIpsum({ count: getRandomInt({ min: 1, max: 5}), units: 'words' }),
  img: randomImage({ width: 140, time: i }),
}));
export default class Music extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>
        <Section title="New Releases" data={releasesData} cardClassName="release-card" titleIcon="more_vert" />
        <Section title="Recommended" data={recommendedData} cardClassName="recommended-card" />
        <Section title={loremTitle} data={lorems} className="lorems" cardClassName="lorem-card" />
      </div>
    );
  }
}
