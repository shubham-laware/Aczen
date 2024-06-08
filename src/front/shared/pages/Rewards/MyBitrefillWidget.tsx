import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './MyBitrefillWidget.scss';

interface BitrefillWidgetProps {
  url?: string;
}

interface BitrefillMessageEvent extends MessageEvent {
  data: {
    event: string;
    invoiceId?: string;
    paymentUri?: string;
  };
}

class MyBitrefillWidget extends React.Component<BitrefillWidgetProps> {
  iframeRef: React.RefObject<HTMLIFrameElement>;

  constructor(props: BitrefillWidgetProps) {
    super(props);
    this.iframeRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessage);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = (e: BitrefillMessageEvent) => {
    if (e.origin !== 'https://embed.bitrefill.com') {
      return;
    }

    const { event, invoiceId, paymentUri } = e.data;

    switch (event) {
      case 'payment_intent':
        // Pay the users invoice with the `paymentUri`
        break;
      default:
        break;
    }
  };

  render() {
    const { url = 'https://embed.bitrefill.com/' } = this.props;
    const config = {
      utm_source: 'Aczen',
      theme: 'dark',
      paymentMethods: [
        'bitcoin',
        'checkout_card',
        'dash',
        'ethereum',
        'lightning',
        'litecoin',
        'usdc_erc20',
        'usdc_polygon',
        'usdt_erc20',
        'usdt_polygon',
        'usdt_trc20'
      ].join(','),
    };

    return (
      <iframe
        ref={this.iframeRef}
        title="Bitrefill"
        src={`${url}?${new URLSearchParams(config)}`}
        style={{ border: 'none' }}
        sandbox="allow-same-origin allow-popups allow-scripts allow-forms"
        styleName="bfill"
      />
    );
  }
}

const StyledMyBitrefillWidget = CSSModules(MyBitrefillWidget, styles);

export default StyledMyBitrefillWidget;