package com.example.hasapp.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Objects;

import static com.fasterxml.jackson.databind.type.LogicalType.DateTime;

public class Patient {


    private int PID;

    private String pFName;


    private String pLName;


    private String birthday;

    @JsonIgnore
    private LocalDate birthdayConverted;


    private String phoneNumber;

    private String insuranceProvider;

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    private String error;

    public void setPID(int PID) {
        this.PID = PID;
    }

    public int getPID() {
        return PID;
    }

    public String getpFName() {
        return pFName;
    }

    public void setpFName(String pFName) {
        this.pFName = pFName;
    }

    public String getpLName() {
        return pLName;
    }

    public void setpLName(String pLName) {
        this.pLName = pLName;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
        try {
            this.birthdayConverted = LocalDate.parse(birthday);
        }
        catch (Exception e){
            this.birthdayConverted = null;
        }
    }


    public LocalDate getBirthdayConverted() {
        return birthdayConverted;
    }


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getInsuranceProvider() {
        return insuranceProvider;
    }

    public void setInsuranceProvider(String insuranceProvider) {
        this.insuranceProvider = insuranceProvider;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Patient patient = (Patient) o;
        return getPID() == patient.getPID() && Objects.equals(getpFName(), patient.getpFName()) && Objects.equals(getpLName(), patient.getpLName()) && Objects.equals(getBirthday(), patient.getBirthday()) && Objects.equals(getBirthdayConverted(), patient.getBirthdayConverted()) && Objects.equals(getPhoneNumber(), patient.getPhoneNumber()) && Objects.equals(getInsuranceProvider(), patient.getInsuranceProvider()) && Objects.equals(getError(), patient.getError());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPID(), getpFName(), getpLName(), getBirthday(), getBirthdayConverted(), getPhoneNumber(), getInsuranceProvider(), getError());
    }
}
