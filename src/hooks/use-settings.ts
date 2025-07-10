"use client"

import { Settings } from "../types/settings"
import { useGetQuery } from "./queries-actions"


// Settings hook with aggressive caching
export const useSettings = () => {
  const {
    data: settings,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetQuery<Settings>({
    key: ["settings"],
    url: "settings",
    options: {
      // Cache settings for 24 hours (86400000 ms)
      staleTime: 24 * 60 * 60 * 1000,
      // Keep in cache for 7 days
      gcTime: 7 * 24 * 60 * 60 * 1000,
      // Retry failed requests
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Don't refetch on window focus, mount, or reconnect
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      // Only refetch if data is actually stale
      refetchInterval: false,
      // Ensure settings are always available
      networkMode: "offlineFirst",
    },
  })

  // Force refresh settings (use sparingly)
  const refreshSettings = () => {
    refetch()
  }

  return {
    settings,
    isLoading,
    error,
    isError,
    refreshSettings,
  }
}

// Separate hook for just checking if settings are loaded (useful for conditional rendering)
export const useSettingsStatus = () => {
  const { settings, isLoading, isError } = useSettings()

  return {
    isSettingsLoaded: !!settings && !isLoading,
    isSettingsLoading: isLoading,
    hasSettingsError: isError,
    hasSettings: !!settings,
  }
}

// Hook for specific setting sections (to avoid unnecessary re-renders)
export const useGeneralSettings = () => {
  const { settings, isLoading, isError } = useSettings()
  const general = settings?.general

  return {
    general,
    isLoading,
    isError,
  }
}

export const useContactSettings = () => {
  const { settings, isLoading, isError } = useSettings()
  const contact = settings?.contact

  return {
    contact,
    isLoading,
    isError,
  }
}

export const useSocialSettings = () => {
  const { settings, isLoading, isError } = useSettings()
  const social = settings?.social

  return {
    social,
    isLoading,
    isError,
  }
}

export const useLocalizationSettings = () => {
  const { settings, isLoading, isError } = useSettings()
  const localization = settings?.localization

  return {
    localization,
    isLoading,
    isError,
  }
}

export const usePaymentSettings = () => {
  const { settings, isLoading, isError } = useSettings()
  const payment = settings?.payment

  return {
    payment,
    isLoading,
    isError,
  }
}

export const useDeliverySettings = () => {
  const { settings, isLoading, isError } = useSettings()
  const delivery = settings?.delivery

  return {
    delivery,
    isLoading,
    isError,
  }
}

export const useNotificationSettings = () => {
  const { settings, isLoading, isError } = useSettings()
  const notification = settings?.notification

  return {
    notification,
    isLoading,
    isError,
  }
}

export const useDiscountSettings = () => {
  const { settings, isLoading, isError } = useSettings()
  const discount = settings?.discount

  return {
    discount,
    isLoading,
    isError,
  }
}
