import Blockly from "blockly";

export const getJSToolbox = () => {
  return {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "JavaScript Blocks",
      },
      {
        kind: "category",
        name: "Lists",
        colour: "#745CA6",
        contents: [
          {
            kind: "block",
            blockxml:
              '    <block type="lists_indexOf">\n' +
              '      <field name="END">FIRST</field>\n' +
              '      <value name="VALUE">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_create_with">\n' +
              '      <mutation items="0"></mutation>\n' +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_repeat">\n' +
              '      <value name="NUM">\n' +
              '        <shadow type="math_number">\n' +
              '          <field name="NUM">5</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_getIndex">\n' +
              '      <mutation statement="false" at="true"></mutation>\n' +
              '      <field name="MODE">GET</field>\n' +
              '      <field name="WHERE">FROM_START</field>\n' +
              '      <value name="VALUE">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_setIndex">\n' +
              '      <mutation at="true"></mutation>\n' +
              '      <field name="MODE">SET</field>\n' +
              '      <field name="WHERE">FROM_START</field>\n' +
              '      <value name="LIST">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_getSublist">\n' +
              '      <mutation at1="true" at2="true"></mutation>\n' +
              '      <field name="WHERE1">FROM_START</field>\n' +
              '      <field name="WHERE2">FROM_START</field>\n' +
              '      <value name="LIST">\n' +
              '        <block type="variables_get">\n' +
              '          <field name="VAR" id="e`(L;x,.j[[XN`F33Q5." variabletype="">list</field>\n' +
              "        </block>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_split">\n' +
              '      <mutation mode="SPLIT"></mutation>\n' +
              '      <field name="MODE">SPLIT</field>\n' +
              '      <value name="DELIM">\n' +
              '        <shadow type="text">\n' +
              '          <field name="TEXT">,</field>\n' +
              "        </shadow>\n" +
              "      </value>\n" +
              "    </block>\n",
          },
          {
            kind: "block",
            blockxml:
              '    <block type="lists_sort">\n' +
              '      <field name="TYPE">NUMERIC</field>\n' +
              '      <field name="DIRECTION">1</field>\n' +
              "    </block>\n",
          },
        ],
      },
      {
        kind: "category",
        name: "Logic",
        colour: 210,
        contents: [
          {
            kind: "block",
            blockxml: '<block type="logic_compare"></block>',
          },
          {
            kind: "block",
            blockxml: '<block type="logic_operation"></block>',
          },
          {
            kind: "block",
            blockxml: '<block type="logic_boolean"></block>',
          },
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
          { kind: "block", blockxml: '<block type="math_number"></block>' },
          { kind: "block", blockxml: '<block type="math_single"></block>' },
          { kind: "block", blockxml: '<block type="math_trig"></block>' },
          { kind: "block", blockxml: '<block type="math_constant"></block>' },
          {
            kind: "block",
            blockxml: '<block type="math_number_property"></block>',
          },
          { kind: "block", blockxml: '<block type="math_arithmetic"></block>' },
          { kind: "block", blockxml: '<block type="math_on_list"></block>' },
          { kind: "block", blockxml: '<block type="math_modulo"></block>' },
          { kind: "block", blockxml: '<block type="math_constrain"></block>' },
          { kind: "block", blockxml: '<block type="math_random_int"></block>' },
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
