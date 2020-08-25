import { PlantUmlPipe } from 'plantuml-pipe'
import { setImage } from 'utils/filesystem'

export const getImage = async (src: string): Promise<void> => {
  const chunk = src
    .replace(/^```plantuml(\n)/, '')
    .replace(/`{3}(\n|$)/, '')

  if (!chunk) {
    return
  }
  
  console.log(chunk)

  const plantuml = new PlantUmlPipe()
  plantuml.out.on('data', setImage('image'))
  plantuml.in.write(chunk)
  plantuml.in.end()
}