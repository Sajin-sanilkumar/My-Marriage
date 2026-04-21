/**
 * Shared date and time formatting utilities for the wedding invitation.
 */

/**
 * Returns the ordinal suffix for a day of the month (st, nd, rd, th).
 */
export function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:  return 'st';
    case 2:  return 'nd';
    case 3:  return 'rd';
    default: return 'th';
  }
}

/**
 * Formats an ISO date string into a premium wedding format.
 * Example: "2026-04-26T05:15:00.000Z" -> "Sunday, 26th April 2026"
 */
export function formatWeddingDate(iso: string): string {
  if (!iso) return '';
  
  // Split manually to avoid timezone shifting for the date part
  const parts = iso.split('T')[0].split('-');
  if (parts.length !== 3) return iso;
  
  const [y, mo, d] = parts.map(Number);
  const date = new Date(y, mo - 1, d);
  
  if (isNaN(date.getTime())) return iso;

  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();

  return `${weekday}, ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

/**
 * Formats a time string (HH:MM or HH:MM AM/PM) into a clean format.
 * Example: "10:30" -> "10:30 AM", "17:00" -> "5:00 PM"
 */
export function formatWeddingTime(t: string): string {
  if (!t) return '';
  
  // Handle if time already includes AM/PM
  if (t.toUpperCase().includes('AM') || t.toUpperCase().includes('PM')) {
    return t;
  }
  
  // Handle if time is in HH:MM format (24-hour)
  const parts = t.split(':');
  if (parts.length < 2) return t;
  
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  
  if (isNaN(h) || isNaN(m)) return t;
  
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  const mins = m === 0 ? '' : `:${String(m).padStart(2, '0')}`;
  
  return `${hour}${mins} ${ampm}`;
}
