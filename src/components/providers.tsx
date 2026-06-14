"use client"

import { Toaster } from "react-hot-toast"

import { AuthProvider } from "@/contexts/AuthContext"
import { UserProvider } from "@/contexts/UserContext"
import { DarkModeProvider } from "@/contexts/DarkModeContext"
import { SidebarProvider } from "@/contexts/SidebarContext"
import { ThemeProvider } from "@/app/hooks/useTheme"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <DarkModeProvider>
            <SidebarProvider>
              {children}
              <Toaster position="top-center" />
            </SidebarProvider>
          </DarkModeProvider>
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  )
}
