import { PlantUmlPipe } from 'plantuml-pipe'
import { setImage, findImage } from 'utils/filesystem'

const getImage = async (uml: string): Promise<string> => {
  const image = ''
  
  const pipe = new PlantUmlPipe()

  pipe.out.on('data', (chunk: string) => {
    image.concat(chunk)
  })

  pipe.in.write(uml)
  pipe.in.end()

  return image
}

export const getWithSvg = async (content: string): Promise<string> => {
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
    console.log('image: ', image)
    
    content.replace(/```plantuml(\n)(.|\n)*`{3}(\n)/, image)
  }

  return content
}
