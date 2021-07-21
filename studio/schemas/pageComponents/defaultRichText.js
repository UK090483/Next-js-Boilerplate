import React from 'react'

const pinkIcon = () => <span style={{ color: '#f5c5d9' }}>P</span>
const pinkRender = props => (
  <span style={{ color: '#f5c5d9' }}>{props.children}</span>
)
const whiteIcon = () => (
  <span style={{ color: 'white', backgroundColor: 'black' }}>W</span>
)
const whiteRender = props => (
  <span style={{ color: 'white', backgroundColor: 'black' }}>
    {props.children}
  </span>
)

const Button = props => {
  return <span>{props.label}</span>
}

const getStyle = (fs, mb, bold) => {
  return {
    style: {
      fontSize: (30 / 50) * fs,
      marginTop: 0,
      marginBottom: `${mb || 1}rem`,
      fontWeight: bold ? '700' : '400',
      lineHeight: '1em'
    }
  }
}

export default {
  name: 'defaultRichText',
  type: 'array',
  title: 'Text',

  of: [
    {
      type: 'block',
      title: 'Block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'}
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Underline',
            value: 'underline'
          },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              { title: 'Link', name: 'link', type: 'link' },
              {
                title: 'As Button',
                name: 'asButton',
                type: 'boolean'
              }
            ],
            blockEditor: {
              icon: () => 'Hyper',
              render: props => {
                return (
                  <a style={{ textDecoration: 'underline', color: 'red' }}>
                    {props.children}
                  </a>
                )
              }
            }
          },
          {
            name: 'frida',
            type: 'object',
            title: 'Frida',
            fields: [
              {
                title: 'Color',
                name: 'color',
                type: 'string',
                options: {
                  list: [
                    { title: 'White', value: 'white' },
                    { title: 'Pink', value: 'pink' }
                  ],
                  layout: 'radio'
                }
              }
            ],
            blockEditor: {
              render: props => {
                return (
                  <span>
                    Meet
                    <span style={{ textDecoration: 'underline' }}>
                      {props.children}
                    </span>
                  </span>
                )
              }
            }
          }
        ]
      }
    },
    { type: 'button', blockEditor: { render: Button } },
    // { type: 'embed' },
    // { type: 'imagePlug' },
    // { type: 'seoHeader' },
    // { type: 'imageGalleryPlug' },
    // { type: 'innerSection' },
    // { type: 'spacer' },
    // { type: 'download' }
  ]
}
