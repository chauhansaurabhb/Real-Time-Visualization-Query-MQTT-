package framework;

import com.google.gson.Gson;

import iotsuite.pubsubmiddleware.*;
import iotsuite.semanticmodel.*;
import iotsuite.common.*;

public abstract class TemperatureSensor implements Runnable {

	protected final PubSubMiddleware myPubSubMiddleware;
	protected final Device myDeviceInfo;
	Gson gson = new Gson();

	public TemperatureSensor(PubSubMiddleware pubSubM, Device deviceInfo) {
		this.myPubSubMiddleware = pubSubM;
		this.myDeviceInfo = deviceInfo;
	}

	private TempStruct tempMeasurement;

	protected void settempMeasurement(TempStruct newValue) {
		if (tempMeasurement != newValue) {
			tempMeasurement = newValue;

			Logger.log(myDeviceInfo.getName(), "TemperatureSensor",
					"Publishing tempMeasurement");

			// convert java object to JSON format,
			// and returned as JSON formatted string
			String data = gson.toJson(newValue);
			this.myPubSubMiddleware.publish("tempMeasurement",
					data);

			
		}

	}

	public TempStruct gettempMeasurement() {
		return tempMeasurement;
	}

	@Override
	public void run() {

	}

}