export interface BloodPressureSearch {
    patientId: number;
    date?: string;
    dateFrom?: string;
    dateTo?: string;
    sysAbove?: string;
    sysBelow?: string;
    diaAbove?: string;
    diaBelow?: string;
    pulseAbove?: string;
    pulseBelow?: string;
}
