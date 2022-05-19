import { SetStateAction } from "react"

export type USE_STATE_STRING = [
  getter: string,
  setter: React.Dispatch<SetStateAction<string>>,
]

export type USE_STATE_NUMBER = [
  getter: number,
  setter: React.Dispatch<SetStateAction<number>>,
]