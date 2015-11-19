//package fr.inria.arles.pankesh.gen;

package framework;

import java.io.Serializable;

public class TempStruct implements Serializable {
	private static final long serialVersionUID = 1L;

	private double tempValue;

	public double gettempValue() {
		return tempValue;
	}

	private String unitOfMeasurement;

	public String getunitOfMeasurement() {
		return unitOfMeasurement;
	}

	public TempStruct(double tempValue, String unitOfMeasurement) {

		this.tempValue = tempValue;
		this.unitOfMeasurement = unitOfMeasurement;
	}

	/*public String toJSON() {
		String json = String.format(
				"{'tempValue': '%f', 'unitOfMeasurement': '%s'}", tempValue,
				unitOfMeasurement);
		return json;
	}*/
}