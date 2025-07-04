import React, { useEffect, useRef, useState } from "react";
import BlocklyComponent, {
  Block,
  Value,
  Field,
  Shadow,
  Mutation,
} from "../../Blockly";

// import "../../customBlocks";
import "../../generator";
import { useParams } from "react-router-dom";
import app_config from "../../config";
import { useBlockContext } from "../../context/BlockContext";
import '../../customBlocks';
import CustomBlock from "../../MyCustomBlocks";

const Builder = () => {
  const { chapter_id } = useParams();

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("trainer"))
  );

  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { addedBlocks, setAddedBlocks } = useBlockContext();

  const [xml, setXml] = useState(`<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="controls_ifelse" x="10" y="10">

</block>
</xml>`);

  const fetchChapterData = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/chapter/getbyid/${chapter_id}`);
    const data = await res.json();
    setChapterData(data.result);
    setLoading(false);
  };

  useEffect(() => {
    // fetchChapterData();
  }, []);

  const checkBlockAlreadyAdded = (blockname) => {
    return addedBlocks.includes(blockname);
  };

  const addBlock = (blockname) => {
    const blockToAdd = blockOptions[blockname];
    setAddedBlocks([...addedBlocks, blockToAdd]);
    console.log(addedBlocks);
  };

  const updateChapter = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/chapter/update/${chapterData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          xml: xml,
          blocks: addedBlocks,
        },
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  // const blockOptions = {
  //   controls_repeat_ext: (
  //     <Block type="controls_repeat_ext">
  //       <Value name="TIMES">
  //         <Shadow type="math_number">
  //           <Field name="NUM">10</Field>
  //         </Shadow>
  //       </Value>
  //     </Block>
  //   ),
  //   text_charAt: (
  //     <Block type="text_charAt">
  //       <Value name="VALUE">
  //         <Block type="variables_get">
  //           <Field name="VAR">text</Field>
  //         </Block>
  //       </Value>
  //     </Block>
  //   ),
  // };

  const blockOptions = {
    controls_repeat_ext: {
      type: "controls_repeat_ext",
    },
    text_charAt: {
      type: "text_charAt",
    },
  };

  const displayBlockOptions = () => {
    return Object.keys(blockOptions).map((block) => (
      <div className="row mb-3">
        <div className="col-8">
          <h5>{block}</h5>
        </div>
        <div className="col-4">
          <button
            className="btn btn-primary w-100"
            disabled={checkBlockAlreadyAdded(block)}
            onClick={() => addBlock(block)}
          >
            Add
          </button>
        </div>
      </div>
    ));
  };

  const chapterUpdateForm = () => {};

  const toolboxCategories = {
    // Include your custom block type in the desired category
    category: [
      {
        type: 'myCustomBlock',
        colour: '#A065A1',
      }
    ],
  };

  return (
    <div>
      <div className="container-fluid">
        <div style={{ height: "25vh", overflow: "auto" }} className="">
          {displayBlockOptions()}
        </div>
        <button className="btn btn-primary" onClick={updateChapter}>
          Update Chapter
        </button>
        <BlocklyComponent
          toolboxCategories={toolboxCategories} 
          readOnly={false}
          trashcan={false}
          media={"media/"}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true,
          }}
          initialXml={xml}
          height="60vh"
        // blocks={addedBlocks}
        >
          <Block type="controls_repeat_ext">
            <Value name="TIMES">
              <Shadow type="math_number">
                <Field name="NUM">10</Field>
              </Shadow>
            </Value>
          </Block>
          <Block type="logic_compare"></Block>
          <Block type="text_charAt">
            <Value name="VALUE">
              <Block type="variables_get">
                <Field name="VAR">text</Field>
              </Block>
            </Value>
          </Block>
          <Block type="test_react_field" />
            <Block type="test_react_date_field" />
            <Block type="controls_ifelse" />
            <Block type="logic_compare" />
            <Block type="logic_operation" />
            <Block type="controls_repeat_ext">
              <Value name="TIMES">
                <Shadow type="math_number">
                  <Field name="NUM">10</Field>
                </Shadow>
              </Value>
            </Block>
            <Block type="logic_operation" />
            <Block type="logic_negate" />
            <Block type="logic_boolean" />
            <Block type="logic_null" disabled="true" />
            <Block type="logic_ternary" />
            <Block type="text_charAt">
              <Value name="VALUE">
                <Block type="variables_get">
                  <Field name="VAR">text</Field>
                </Block>
              </Value>
            </Block>

        </BlocklyComponent>

        <Value name="TYPE">
              <Shadow xmlns="http://www.w3.org/1999/xhtml" type="type_null" id="BLj0bOn$fER9KS;#`RU]"></Shadow>
              <Block type="type_other" id="BI?PU:MKzgPw7A:7Jr@]">
                <Field name="TYPE">header</Field>
              </Block>
            </Value>
      </div>
    </div>
  );
};

export default Builder;
