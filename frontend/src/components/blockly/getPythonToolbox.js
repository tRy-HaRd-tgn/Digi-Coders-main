import Blockly from "blockly";

export const getPythonToolbox = () => {
  return {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Python Blocks",
      },
      { kind: "sep" },
      {
        kind: "category",
        name: "Lists",
        colour: "#745CA6",
        contents: [
          { kind: "block", blockxml: '<block type="lists_indexOf"></block>' },
          {
            kind: "block",
            blockxml: '<block type="lists_create_with"></block>',
          },
          { kind: "block", blockxml: '<block type="lists_repeat"></block>' },
          { kind: "block", blockxml: '<block type="lists_getIndex"></block>' },
          { kind: "block", blockxml: '<block type="lists_setIndex"></block>' },
          {
            kind: "block",
            blockxml: '<block type="lists_getSublist"></block>',
          },
          { kind: "block", blockxml: '<block type="lists_split"></block>' },
          { kind: "block", blockxml: '<block type="lists_sort"></block>' },
        ],
      },
      {
        kind: "category",
        name: "Logic",
        colour: 210,
        contents: [
          { kind: "block", blockxml: '<block type="logic_compare"></block>' },
          { kind: "block", blockxml: '<block type="logic_operation"></block>' },
          { kind: "block", blockxml: '<block type="logic_boolean"></block>' },
        ],
      },
      {
        kind: "category",
        name: "Loops",
        colour: 120,
        contents: [
          {
            kind: "block",
            blockxml:
              '<block type="controls_repeat_ext">\n' +
              '      <value name="TIMES">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">10</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="controls_whileUntil">\n' +
              '      <field name="MODE">WHILE</field>\n' +
              "    </block>",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="controls_for">\n' +
              '      <field name="VAR" id="C(8;cYCF}~vSgkxzJ+{O" variabletype="">i</field>\n' +
              '      <value name="FROM">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">1</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="TO">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">10</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="BY">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">1</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="controls_forEach">\n' +
              '      <field name="VAR" id="Cg!CSk/ZJo2XQN3=VVrz" variabletype="">j</field>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="controls_flow_statements">\n' +
              '      <field name="FLOW">BREAK</field>\n' +
              "    </block>\n",
          },
        ],
      },
      {
        kind: "category",
        name: "Math",
        colour: 230,
        contents: [
          // {
          //   kind: 'block',
          //   blockxml:
          //     '    <block type="math_round">\n' +
          //     '      <field name="OP">ROUND</field>\n' +
          //     '      <value name="NUM">\n' +
          //     '        <shadow type="math_number">\n' +
          //     '          <field name="NUM">3.1</field>\n' +
          //     '        </shadow>\n' +
          //     '      </value>\n' +
          //     '    </block>\n'
          // },
          {
            kind: "block",
            blockxml:
              '    <block type="math_number">\n' +
              '      <field name="NUM">0</field>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_single">\n' +
              '      <field name="OP">ROOT</field>\n' +
              '      <value name="NUM">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">9</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_trig">\n' +
              '      <field name="OP">SIN</field>\n' +
              '      <value name="NUM">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">45</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_constant">\n' +
              '      <field name="CONSTANT">PI</field>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_number_property">\n' +
              '      <mutation divisor_input="false"></mutation>\n' +
              '      <field name="PROPERTY">EVEN</field>\n' +
              '      <value name="NUMBER_TO_CHECK">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">0</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_arithmetic">\n' +
              '      <field name="OP">ADD</field>\n' +
              '      <value name="A">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">1</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="B">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">1</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_on_list">\n' +
              '      <mutation op="SUM"></mutation>\n' +
              '      <field name="OP">SUM</field>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_modulo">\n' +
              '      <value name="DIVIDEND">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">64</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="DIVISOR">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">10</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_constrain">\n' +
              '      <value name="VALUE">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">50</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="LOW">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">1</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="HIGH">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">100</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="math_random_int">\n' +
              '      <value name="FROM">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">1</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              '      <value name="TO">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">100</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml: '<block type="math_random_float"></block>',
          },
        ],
      },
      {
        kind: "category",
        name: "Text",
        colour: 160,
        contents: [
          {
            kind: "block",
            blockxml:
              '    <block type="text_charAt">\n' +
              '      <mutation at="true"></mutation>\n' +
              '      <field name="WHERE">FROM_START</field>\n' +
              '      <value name="VALUE">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text">\n' +
              '      <field name="TEXT"></field>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_append">\n' +
              '      <field name="VAR" id=":};P,s[*|I8+L^-.EbRi" variabletype="">item</field>\n' +
              '      <value name="TEXT">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT"></field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_length">\n' +
              '      <value name="VALUE">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">abc</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_isEmpty">\n' +
              '      <value name="VALUE">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT"></field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_indexOf">\n' +
              '      <field name="END">FIRST</field>\n' +
              '      <value name="VALUE">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              '      <value name="FIND">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">abc</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_join">\n' +
              '      <mutation items="2"></mutation>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_getSubstring">\n' +
              '      <mutation at1="true" at2="true"></mutation>\n' +
              '      <field name="WHERE1">FROM_START</field>\n' +
              '      <field name="WHERE2">FROM_START</field>\n' +
              '      <value name="STRING">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="q@$ZF(L?Zo/z`d{o.Bp!" variabletype="">text</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_changeCase">\n' +
              '      <field name="CASE">UPPERCASE</field>\n' +
              '      <value name="TEXT">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">abc</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_trim">\n' +
              '      <field name="MODE">BOTH</field>\n' +
              '      <value name="TEXT">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">abc</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_print">\n' +
              '      <value name="TEXT">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">abc</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="text_prompt_ext">\n' +
              '      <mutation type="TEXT"></mutation>\n' +
              '      <field name="TYPE">TEXT</field>\n' +
              '      <value name="TEXT">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">abc</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
        ],
      },

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
      { kind: "sep" },
      {
        kind: "category",
        name: "Variables",
        custom: "VARIABLE",
        colour: 200,
      },
      {
        kind: "category",
        name: "Functions",
        custom: "PROCEDURE",
        colour: 290,
      },
    ],
  };
};
