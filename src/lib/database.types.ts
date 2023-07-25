export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Dream: {
        Row: {
          createdAt: string
          dreamContentId: number
          id: number
          title: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          dreamContentId: number
          id?: number
          title: string
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          dreamContentId?: number
          id?: number
          title?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Dream_dreamContentId_fkey"
            columns: ["dreamContentId"]
            referencedRelation: "DreamContent"
            referencedColumns: ["id"]
          }
        ]
      }
      DreamContent: {
        Row: {
          content: string
          createdAt: string
          id: number
          updatedAt: string
        }
        Insert: {
          content: string
          createdAt?: string
          id?: number
          updatedAt: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: number
          updatedAt?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
