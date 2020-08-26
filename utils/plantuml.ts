import { PlantUmlPipe } from 'plantuml-pipe'
import { setImage, findImage } from 'utils/filesystem'

const getImage = async (uml: string): Promise<string> => {
  let image = ''
  let isDone = false

  const pipe = new PlantUmlPipe()

  pipe.out.on('data', (chunk: string) => {
    image = String(chunk)
    isDone = true
  })

  pipe.in.write(uml)
  pipe.in.end()

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (isDone) {
        console.log('image: ', image)
        
        resolve(image)
        clearInterval(interval)
      }
    }, 100)
  })
}

export const getWithSvg = async (content: string): Promise<string> => {
  let result = ''

  const plantumls = (
    content.match(/```plantuml(\n)(.|\n)*`{3}(\n)/g) || 
    []
  )
    .map(markdown => (
      markdown
        .replace(/^```plantuml(\n)/, '')
        .replace(/`{3}(\n|$)/, '')
    ))

  for (const plantuml of plantumls) {
    const image = await getImage(plantuml)
    result = content.replace(/```plantuml(\n)(.|\n)*`{3}(\n)/, image)
  }

  return result
}
