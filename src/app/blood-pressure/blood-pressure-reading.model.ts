export interface BloodPressureReading {
    id?: number;
    patient_id: number;
    sys: number;
    dia: number;
    pulse: number;
    created_at: Date | string;
}