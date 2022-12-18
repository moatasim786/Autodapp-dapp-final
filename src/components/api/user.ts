import { addOption, updateOption } from "../axios"
import { loadLocal, saveLocal } from "../utils"

export const userApi = {
    deleteOption: async function (option: string, isBack = true) {
        const token = localStorage.getItem('token')

        const {code} = await updateOption({email: token, option: option})

        if (code === 'SR') {
            const options = loadLocal('autodapp_user_option')

            if (options?.length > 1) {
                const filtered = options.filter((o: any) => o?.option !== option)
                saveLocal('autodapp_user_option', filtered)
            } else {
                localStorage.removeItem('autodapp_user_option')
            }
            
            if (isBack) {
                window.location.href = "/";
            }
        }
    },
    addOption: async function (data: {option: string, email: string | null, wallet: string | null | undefined}) {
        const res = await addOption(data)
        // console.log('res', res)
        if (res?.code === 'SR') {
            saveLocal('autodapp_user_option', res?.options)
            return true; 
        }
    },
}