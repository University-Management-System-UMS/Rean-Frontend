type DateFormat = {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  hour12?: boolean;
};

export const DateUtils = {
  parse: {
    fromYYYYMMDDHHMMSS: (timestamp: string): Date => {
      if (timestamp.length !== 14) throw new Error('Invalid timestamp format');
      const year = timestamp.slice(0, 4);
      const month = timestamp.slice(4, 6);
      const day = timestamp.slice(6, 8);
      const hour = timestamp.slice(8, 10);
      const minute = timestamp.slice(10, 12);
      const second = timestamp.slice(12, 14);
      return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
    },
    
    fromISO: (dateString: string): Date => new Date(dateString),
  },

  format: {
    toTime: (date: Date, locale: string = 'en-US'): string => {
      return date.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    },

    toDate: (date: Date, locale: string = 'en-US'): string => {
      return date.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    },

    toCustom: (date: Date, format: DateFormat, locale: string = 'en-US'): string => {
      return date.toLocaleString(locale, format);
    },

    toKhmerDate: (date: Date): string => {
      return date.toLocaleDateString('km-KH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },


    toKhmerTime: (date: Date): string => {
      return date.toLocaleTimeString('km-KH', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  },

  formatString: {
    toTime: (date: string, locale: string = 'en-US'): string => {
      const dateObj = new Date(date);
      return dateObj.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    },
    toDate: (date: string, locale: string = 'en-US'): string => {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString(locale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    },
    toContextualDate: (date: string, locale: string = 'en-US'): string => {
      const dateObj = new Date(date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
    
      if (dateObj.toDateString() === today.toDateString()) return 'Today';
      if (dateObj.toDateString() === yesterday.toDateString()) return 'Yesterday';
      
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = dateObj.toLocaleDateString(locale, { month: 'short' });
      const year = dateObj.getFullYear();
      
      return `${day} ${month}-${year}`;
    }
  },

  compare: {
    isToday: (date: Date): boolean => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    },

    isYesterday: (date: Date): boolean => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return date.toDateString() === yesterday.toDateString();
    },

    isSameDay: (date1: Date, date2: Date): boolean => {
      return date1.toDateString() === date2.toDateString();
    },
  },

  relative: {
    getRelativeDay: (date: Date): string => {
      if (DateUtils.compare.isToday(date)) return 'Today';
      if (DateUtils.compare.isYesterday(date)) return 'Yesterday';
      return DateUtils.format.toDate(date);
    }
  }
};