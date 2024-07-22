import { nanoid } from "nanoid";
import type { AIQuestion } from "@/typings/ai";
import type { ComponentInfoType } from "@/typings/model";

class AiParser {
  static instance: AiParser;

  static getInstance(): AiParser {
    if (!AiParser.instance) {
      AiParser.instance = new AiParser();
    }
    return AiParser.instance;
  }

  private constructor() {}

  runner(input: AIQuestion): ComponentInfoType[] {
    const components: ComponentInfoType[] = [
      this.parseTitle(input.title),
      this.parseDescription(input.description),
    ];

    components.push(...input.questions?.map((item) => {
      const { title, desc, type, ...extra } = item
      return {
        id: nanoid(),
        type,
        name: title,
        props: {
          label: title,
          description: desc,
          placeholder: `请填写${title}`,
          ...extra,
        },
        style: {},
        commonStyle: {
          layout: {
            margin: {
              margin: null,
              padding: {
                left: 12,
                right: 12,
                top: 12
              }
            }
          }
        }
      }
    }))

    return components;
  }

  parseTitle(title: string) {
    return {
      id: nanoid(),
      type: 'title',
      name: '表单标题',
      props: {
        text: title,
        level: 2,
      },
      style: {},
      commonStyle: {
        layout: {
          margin: {
            margin: {
              top: 24,
              bottom: 24
            }
          }
        },
        text: {
          align: 'center',
          color: 'rgb(0, 0, 0)',
        },
      }
    }
  }

  parseDescription(description: string) {
    return {
      id: nanoid(),
      type: 'paragraph',
      name: '表单描述',
      props: {
        text: description,
      },
      style: {},
      commonStyle: {
        layout: {
          display: 'block',
          margin: {
            margin: null,
            padding: {
              left: 20,
              right: 20
            }
          }
        },
        text: {
          color: 'rgb(48, 47, 47)',
          size: {
            value: 16,
            unit: 'px'
          },
          align: 'center',
        },
      }
    }
  }
}

export default AiParser.getInstance();