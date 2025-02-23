declare module "tesseract.js" {
    interface WorkerOptions {
      logger?: (arg: any) => void
      errorHandler?: (arg: any) => void
      [key: string]: any
    }
  
    interface RecognizeResult {
      data: {
        text: string
        hocr: string
        tsv: string
        boxes: any[]
        confidence: number
        [key: string]: any
      }
    }
  
    interface Worker {
      load(): Promise<void>
      loadLanguage(langs: string): Promise<void>
      initialize(langs: string): Promise<void>
      setParameters(params: { [key: string]: any }): Promise<void>
      recognize(image: any): Promise<RecognizeResult>
      terminate(): Promise<void>
    }
  
    export function createWorker(options?: WorkerOptions): Promise<Worker>

  export function recognize(file: File, arg1: string, arg2: { logger: (m: any) => void }) {
    throw new Error("Function not implemented.")
  }
  }
  
  