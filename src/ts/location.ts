interface record {
	coords: localisation;
	timestamp: number;
}

interface localisation {
	latitude: number;
	longitude: number;
	altitude: number | null;
	accuracy: number;
	altitudeAccuracy: number | null;
	heading: number | null;
	speed: number | null;
}

function getLocation(cbSuccess: any, cbError: any): void {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
	} else {
		cbError();
	}
}

function get(cb: (coordinates: localisation | null) => void) {
	const onSuccess = (record: record) => {
		cb(record.coords);
	};
	const onError = () => {
		cb(null);
	};

	getLocation(onSuccess, onError);
}

export { get };
