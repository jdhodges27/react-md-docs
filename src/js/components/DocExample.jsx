/*eslint-env node*/
import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import { Card, CardTitle, CardText } from 'react-md/lib/Cards';
import Markdown from '../containers/Markdown';
import { toClassName } from '../utils/StringUtils';

export default class DocExample extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    code: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    fallbackId: PropTypes.string.isRequired,
  };

  render() {
    const { code, children, className, name, fallbackId, ...props } = this.props;
    const markdown = `
\`\`\`js
${code}
\`\`\`
    `;

    return (
      <Card
        {...props}
        className={classnames('component-example', className)}
        raise={false}
        iconChildren="code"
        id={name ? toClassName(name) : fallbackId}
      >
        <CardTitle title={name || 'Examples'} isExpander={true} />
        <Markdown expandable={true} markdown={markdown} className="md-card-text example-code" />
        <CardText>{children}</CardText>
      </Card>
    );
  }
}