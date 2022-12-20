// export const steps = (i18n) => [
//   {
//     element: '#guide',
//     popover: {
//       title: 'Title on Popover',
//       description: 'Body of the popover',
//       position: 'left'
//     }
//   },
//   {
//     element: '#hamburger',
//     popover: {
//       title: 'Title on Popover',
//       description: 'Body of the popover',
//       position: 'bottom'
//     }
//   },
//   {
//     element: '#screenFull',
//     popover: {
//       title: 'Title on Popover',
//       description: 'Body of the popover',
//       position: 'left'
//     }
//   }
// ]
export const steps = (i18n) => [
  {
    element: '#guide',
    popover: {
      title: i18n('driver.guideBtn'),
      description: 'Body of the popover',
      position: 'left'
    }
  },
  {
    element: '#hamburger',
    popover: {
      title: i18n('driver.hamburgerBtn'),
      description: 'Body of the popover',
      position: 'bottom'
    }
  },
  {
    element: '#screenFull',
    popover: {
      title: i18n('driver.fullScreen'),
      description: 'Body of the popover',
      position: 'left'
    }
  }
]
