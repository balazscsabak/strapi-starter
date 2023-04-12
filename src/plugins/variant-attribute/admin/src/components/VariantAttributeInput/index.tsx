import React, { useEffect, useState } from "react";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import {
  Typography,
  Box,
  Divider,
  TextInput,
  Grid,
  GridItem,
} from "@strapi/design-system";

const VariantAttributeInput = ({
  name,
  error,
  description,
  onChange,
  value,
  intlLabel,
  attribute,
}: any) => {
  const { modifiedData } = useCMEditViewDataManager();
  const [values, setValues] = useState([]);

  const inputChange = (key: string, value: string, index: number) => {
    const newValues = values.map((v: any, j) => {
      if (j === index) {
        return {
          key,
          value,
        };
      } else {
        v;
      }
    });
    setValues(newValues as []);
  };

  useEffect(() => {
    const attrValues = JSON.parse(value);

    const currentValues = modifiedData?.attributes
      ?.map((attr: any, attrIndex: number) => {
        if (!attr.attributeName) return;

        return {
          key: attr.attributeName,
          value: attrValues?.[attrIndex]?.value
            ? attrValues[attrIndex].value
            : "",
        };
      })
      .filter((attr: any) => attr);

    setValues(currentValues);
  }, [modifiedData.attributes]);

  useEffect(() => {
    onChange({
      target: {
        type: attribute.type,
        name,
        value: JSON.stringify(values),
      },
    });
  }, [values]);

  return (
    <div>
      <Box paddingTop={1} paddingBottom={5}>
        <Divider />
      </Box>

      <Box paddingLeft={0}>
        <Typography variant="pi" fontWeight="bold">
          Attributes
        </Typography>
      </Box>

      <div>
        <Grid gap={2} gridCols={2}>
          {values.map((attr: any, i) => (
            <GridItem>
              <Box key={attr.key} paddingLeft={0}>
                <Typography variant="pi" fontWeight="semi-bold">
                  {attr.key}
                </Typography>

                <Box paddingTop={1}>
                  <TextInput
                    onChnage={(e: any) =>
                      inputChange(attr.key, e.target.value, i)
                    }
                    placeholder="This is a content placeholder"
                    aria-label="variant"
                    labelAction={<></>}
                    size="S"
                  />
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default VariantAttributeInput;
