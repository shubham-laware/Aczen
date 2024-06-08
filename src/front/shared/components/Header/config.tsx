import { defineMessages } from 'react-intl'
import links from 'helpers/links'
import externalConfig from 'helpers/externalConfig'
import metamask from 'helpers/metamask'


const isWidgetBuild = externalConfig && externalConfig.isWidget
const isChromeExtension = externalConfig && externalConfig.dir === 'chrome-extension/application'
const onlyEvmWallets = (externalConfig?.opts?.ui?.disableInternalWallet) ? true : false


export const messages = defineMessages({
  wallet: {
    id: 'menu.wallet',
    description: 'Menu item "Wallet"',
    defaultMessage: 'Wallet',
  },
  createWallet: {
    id: 'menu.CreateWallet',
    description: 'Menu item "Wallet"',
    defaultMessage: 'Create wallet',
  },
  exchange: {
    id: 'menu.exchange',
    description: 'Menu item "Exchange"',
    defaultMessage: 'Exchange',
  },
  history: {
    id: 'menu.history',
    description: 'Menu item "History"',
    defaultMessage: 'Transactions',
  },
  rewards:{
    id:'menu.rewards',
    description:'Menu item Rewards',
    defaultMessage:'Rewards'
  }
  
})

export const getMenuItems = (props) => {
  const { intl } = props
  const {  wallet, createWallet, history,rewards } = messages
  const { 
    exchange: exchangeLink,
    quickSwap,
    createWallet: create,
    history: historyLink,
    home,
    rewardsLink
  } = links

  const itemsWithWallet = [
    {
      title: intl.formatMessage(wallet),
      link: home,
      exact: true,
      currentPageFlag: true,
    },
    {
      title: intl.formatMessage(history),
      link: historyLink,
      exact: true,
      currentPageFlag: true,
    },

    {
      title: intl.formatMessage(rewards),
      link: rewardsLink,
      exact: true,
      currentPageFlag: true,
    },

    
    
  ]

  const itemsWithoutWallet = [
    !onlyEvmWallets && {
      title: intl.formatMessage(createWallet),
      link: create,
      exact: true,
      currentPageFlag: true,
    },
    
  ]

 

  if (onlyEvmWallets && metamask.isConnected()) return itemsWithWallet

  return localStorage.getItem('isWalletCreate') === 'true'
    || externalConfig && externalConfig.isWidget
      ? itemsWithWallet
      : itemsWithoutWallet
}


export const getMenuItemsMobile = (props, isWalletCreate, dinamicPath) => {
  const { intl } = props
  const {  wallet, createWallet, history ,rewards } = messages
  const { 
    exchange: exchangeLink,
    quickSwap,
    history: historyLink,
    rewardsLink
  } = links

  const mobileItemsWithWallet = [
    {
      title: intl.formatMessage(isWalletCreate ? wallet : createWallet),
      link: dinamicPath,
      exact: true,
      icon: <i className="fa fa-home" aria-hidden="true" />,
    },
    {
      title: props.intl.formatMessage(history),
      link: historyLink,
      displayNone: !isWalletCreate,
      icon: <i className="fas fa-exchange-alt" aria-hidden="true" />,
    },

    {
      title: props.intl.formatMessage(rewards),
      link: rewardsLink,
      displayNone: !isWalletCreate,
      icon: <i className="fas fa-exchange-alt" aria-hidden="true" />,
    },
   
  ]

  const mobileItemsWithoutWallet = [
    {
      title: intl.formatMessage(createWallet),
      link: dinamicPath,
      exact: true,
      icon: <i className="fa fa-home" aria-hidden="true" />,
    },
    
  ]

  if (onlyEvmWallets) return mobileItemsWithWallet
  return localStorage.getItem('isWalletCreate') === 'true'
      ? mobileItemsWithWallet
      : mobileItemsWithoutWallet
}

