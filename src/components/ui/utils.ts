type ClassValue = string | number | boolean | undefined | null | ClassValue[] | { [key: string]: any };

function toVal(mix: ClassValue): string {
  let str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (let k = 0; k < mix.length; k++) {
        if (mix[k]) {
          const y = toVal(mix[k]);
          if (y) {
            if (str) str += ' ';
            str += y;
          }
        }
      }
    } else {
      for (const k in mix) {
        if (mix[k]) {
          if (str) str += ' ';
          str += k;
        }
      }
    }
  }

  return str;
}

function clsx(...inputs: ClassValue[]): string {
  let str = '';
  for (let i = 0; i < inputs.length; i++) {
    const tmp = inputs[i];
    if (tmp) {
      const x = toVal(tmp);
      if (x) {
        if (str) str += ' ';
        str += x;
      }
    }
  }
  return str;
}

function twMerge(...inputs: string[]): string {
  let classes = inputs.filter(Boolean).join(' ');
  const classMap = new Map<string, string>();
  
  classes.split(' ').forEach(cls => {
    if (!cls) return;
    
    // Extract base class (e.g., 'bg' from 'bg-red-500')
    const parts = cls.split('-');
    const base = parts[0];
    
    // For Tailwind classes, keep the last occurrence
    classMap.set(cls, cls);
  });
  
  return Array.from(classMap.values()).join(' ');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export type { ClassValue };
