export interface Beacon {
    beaconName: string;
    rssi: string;
    facilityId: string;
    floorId: string;
    minor: string;
    realMajor: string;
    updatedDate: string;
    relativeY: string;
    uuid: string;
    major: string;
    batteryLevel: string;
    latitude: string;
    createdDate: string;
    relativeX: string;
    localName: string;
    txPower: string;
    proximity: string;
    accuracy: string;
    longitude: string;
    moduleId: string;
    nId: string;
    beaconId: string;
    actions: string;
    altitude: string;
    facilityRemove: string;
}

export class BeaconModel implements Beacon {
    beaconName: string = '';
    rssi: string = '';
    facilityId: string = '';
    floorId: string = '';
    minor: string = '';
    realMajor: string = '';
    updatedDate: string = '';
    relativeY: string = '';
    uuid: string = '';
    major: string = '';
    batteryLevel: string = '';
    latitude: string = '';
    createdDate: string = '';
    relativeX: string = '';
    localName: string = '';
    txPower: string = '';
    proximity: string = '';
    accuracy: string = '';
    longitude: string = '';
    moduleId: string = '';
    nId: string = '';
    beaconId: string = '';
    actions: string = '';
    altitude: string = '';
    facilityRemove: string = '';

    constructor(data: Partial<Beacon> = {}) {
        Object.assign(this, data);
    }
}

export function parseJsonToModel(jsonData: Beacon[]): BeaconModel[] {
    let beaconModels: BeaconModel[] = [];

    jsonData.forEach(item => {
        let beaconModel = new BeaconModel(item);
        beaconModels.push(beaconModel);
    });

    return beaconModels;
}