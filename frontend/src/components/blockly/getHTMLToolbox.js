import Blockly from 'blockly';

export const getHTMLToolbox = () => {
  return {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'HTML Blocks',
      },
      { kind: 'sep' },  
      {
        kind: 'category',
        name: 'Base Frame',
        colour: '#a55b5b',
        contents: [
          {
            kind: 'block',
            blockxml: '<block type="html">\n' + '      <statement name="content">\n' + '    <block type="head">\n' + '    <statement name="content">\n' + '  <block type="title">\n' + '      <statement name="content">\n' + '      <block type="plaintext">\n' + '      <field name="content">\n' + '    </field>\n' + '   </block>\n' + '   </statement>\n' + '    </block>\n' + '   </statement>\n' + '  <next>\n' + '  <block type="body">\n' + '  </block>\n' + '  </next>\n' + '  </block>\n' + '  </statement>\n' + '  </block>\n'
          },
          {
            kind: 'block',
            blockxml: `<block type="html"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="body"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="body_attributes"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="head"></block>`
          },
          {
            kind: 'block',
            blockxml: '<block type="title">\n' + '      <statement name="content">\n' + '     <block type="plaintext">\n' + '      <field name="content">\n' + '    </field>\n' + '   </block>\n' + '   </statement>\n' + '    </block>\n'
          },
        ]
      },
      // {
      //   kind: 'category',
      //   name: 'HTML Blocks',
      //   colour: '#a55b5b',
      //   contents: [
      //     {
      //       kind: 'block',
      //       blockxml: `<block type="html"></block>`
      //     },
      //     {
      //       kind: 'block',
      //       blockxml: `<block type="head"></block>`
      //     },
      //     {
      //       kind: 'block',
      //       blockxml: `<block type="title"></block>`
      //     },
      //     {
      //       kind: 'block',
      //       blockxml: `<block type="body"></block>`
      //     },
      //     {
      //       kind: 'block',
      //       blockxml: `<block type="body_attributes"></block>`
      //     },
      //     {
      //       kind: 'block',
      //       blockxml: `<block type="plaintext"></block>`
      //     },
      //   ]
      // },
      // { kind: 'sep' },
      // {
      //   kind: 'category',
      //   name: 'Colour',
      //   colour: 19,
      //   contents: [
      //     {
      //       kind: 'block',
      //       blockxml: '    <block type="colour_picker">\n' + '      <field name="COLOUR">#ff0000</field>\n' + '    </block>\n'
      //     },
      //     {
      //       kind: 'block',
      //       type: 'colour_random'
      //     },
      //     {
      //       kind: 'block',
      //       blockxml:
      //         '    <block type="colour_rgb">\n' +
      //         '      <value name="RED">\n' +
      //         '        <shadow type="math_number">\n' +
      //         '          <field name="NUM">100</field>\n' +
      //         '        </shadow>\n' +
      //         '      </value>\n' +
      //         '      <value name="GREEN">\n' +
      //         '        <shadow type="math_number">\n' +
      //         '          <field name="NUM">50</field>\n' +
      //         '        </shadow>\n' +
      //         '      </value>\n' +
      //         '      <value name="BLUE">\n' +
      //         '        <shadow type="math_number">\n' +
      //         '          <field name="NUM">0</field>\n' +
      //         '        </shadow>\n' +
      //         '      </value>\n' +
      //         '    </block>\n'
      //     },
      //     {
      //       kind: 'block',
      //       blockxml:
      //         '    <block type="colour_blend">\n' +
      //         '      <value name="COLOUR1">\n' +
      //         '        <shadow type="colour_picker">\n' +
      //         '          <field name="COLOUR">#ff0000</field>\n' +
      //         '        </shadow>\n' +
      //         '      </value>\n' +
      //         '      <value name="COLOUR2">\n' +
      //         '        <shadow type="colour_picker">\n' +
      //         '          <field name="COLOUR">#3333ff</field>\n' +
      //         '        </shadow>\n' +
      //         '      </value>\n' +
      //         '      <value name="RATIO">\n' +
      //         '        <shadow type="math_number">\n' +
      //         '          <field name="NUM">0.5</field>\n' +
      //         '        </shadow>\n' +
      //         '      </value>\n' +
      //         '    </block>\n'
      //     }
      //   ]
      // },
      {
        kind: 'category',
        name: 'Text Structure',
        colour: '#5ba55b',
        contents: [
          {
            kind: 'block',
            blockxml: '    <block type="plaintext">\n' + '      <field name="content">#ff0000</field>\n' + '    </block>\n'
          },
          {
            kind: 'block',
            blockxml: '    <block type="horizontalbreak"></block>\n'
          },
          {
            kind: 'block',
            blockxml: '    <block type="linebreak"></block>\n'
          },
          {
            kind: 'block',
            blockxml: '    <block type="paragraph"></block>\n'
          },
          {
            kind: 'block',
            blockxml: '    <block type="headline">\n' + '      <field name="NAME">h1</field>\n' + '    </block>\n'
          },
          {
            kind: 'block',
            blockxml: '    <block type="link">\n' + '      <field name="NAME">target</field>\n' + '    </block>\n'
          },
          {
            kind: 'block',
            blockxml: '    <block type="image">\n' + '      <field name="IMAGE">URL</field>\n' + '     <field name="ALT">alternative text</field>\n' + '     </block>\n'
          },
          {
            kind: 'block',
            blockxml: '    <block type="generictag">\n' + '      <field name="NAME">tag</field>\n' + '    </block>\n'
          },
        ]
      },
      {
        kind: 'category',
        name: 'Text Markup',
        colour: '#5ba55b',
        contents: [
          {
            kind: 'block',
            blockxml: `<block type="emphasise"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="inserted"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="strong"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="deleted"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="super"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="sub"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="code"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="quote"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="blockquote"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="sample"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="keyboard"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="variable"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="division"></block>`
          },
        ]
      },
      {
        kind: 'category',
        name: 'Style',
        colour: '#5b6da5',
        contents: [
          // {
          //   kind: 'block',
          //   blockxml: `<block type="sample"></block>`
          // },
          {
            kind: 'block',
            blockxml: '    <block type="span">\n' + '      <value name="NAME">\n' + '    <block type="style"></block>\n' + '   </value>\n' + '    </block>\n'
          },
          {
            kind: 'block',
            blockxml: `<block type="style"></block>`
          },
          {
            kind: 'block',
            blockxml: '    <block type="color">\n' + '      <field name="NAME">#ff0000</field>\n' + '    </block>\n'
          },
          {
            kind: 'block',
            blockxml: '    <block type="bgcolour">\n' + '      <field name="NAME">#ff0000</field>\n' + '    </block>\n'
          },
          {
            kind: 'block',
            blockxml: '    <block type="genericstyle">\n' + '      <field name="property">property</field>\n' + '     <field name="value">value</field>\n' + '     </block>\n'
          },
          {
            kind: 'block',
            blockxml: `<block type="span"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="division"></block>`
          },
          {
            kind: 'block',
            blockxml: '    <block type="generictag">\n' + '      <field name="NAME">tag</field>\n' + '    </block>\n'
          },
        ]
      },
      {
        kind: 'category',
        name: 'Enumeration',
        colour: '#a55ba5',
        contents: [
          {
            kind: 'block',
            blockxml: `<block type="unorderedlist"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="orderedlist"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="listelement"></block>`
          },
        ]
      },
      {
        kind: 'category',
        name: 'Tables',
        colour: '#5ba5a5',
        contents: [
          {
            kind: 'block',
            blockxml: '    <block type="table">\n' + '      <statement name="content">\n' + '     <block type="tablerow">\n' + '     <statement name="content">\n' + '      <block type="tablecell">\n' + '     <next>\n' + '   <block type="tablecell"></block>\n' + '    </next>\n' + '    </block>\n' + '     </statement>\n' + '   <next>\n' + '     <block type="tablerow">\n' + '    <statement name="content">\n' + '    <block type="tablecell">\n' + '   <next>\n' + '   <block type="tablecell"></block>\n' + '  </next>\n' + '     </block>\n' + '  </statement>\n' + '   </block>\n' + '  </next>\n' + '   </block>\n' + '     </statement>\n' + '      </block>\n'
          },
          {
            kind: 'block',
            blockxml: `<block type="table"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="tablerow"></block>`
          },
          {
            kind: 'block',
            blockxml: `<block type="tablecell"></block>`
          },
        ]
      },
      {
        kind: 'category',
        name: 'Form',
        colour: '#80a55b',
        contents: [
          {
            kind: 'block',
            blockxml: `<block type="form"></block>`
          },
          {
            kind: 'block',
            blockxml: '    <block type="input_text">\n' + '      <field name="default"></field>\n' + '    </block>\n'
          },
          {
            kind: 'block',
            blockxml: `<block type="button"></block>`
          },
          {
            kind: 'block',
            blockxml: '    <block type="input">\n' + '      <field name="type">text</field>\n' + '    <field name="value"></field>\n' + '    </block>\n'
          },
        ]
      },
      // { kind: 'sep' },
      // {
      //   kind: 'category',
      //   name: 'Script',
      //   colour: '#a5a55b',
      //   contents: [
      //     {
      //       kind: 'block',
      //       blockxml: `<block type="script"></block>`
      //     },
      //     {
      //       kind: 'block',
      //       blockxml: `<block type="onclick"></block>`
      //     },
      //   ]
      // },
    ]
  };
};
