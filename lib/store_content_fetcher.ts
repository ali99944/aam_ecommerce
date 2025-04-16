'use server'

import axiosHttp from "./axios_client"

type StoreSection<T> = {
    name: string
    key: string
    content: T
}

export const getSectionData = async <T>(page_key: string, section_key: string): Promise<T | null> => {
    try {
        const res = await axiosHttp.get(`content/pages/${page_key}/sections/${section_key}`)
        const section = res.data as StoreSection<T>

        return section.content
    } catch (error) {
        console.error(error)
        return null
    }
}

