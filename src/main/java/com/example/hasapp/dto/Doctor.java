package com.example.hasapp.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;

@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int did;

    @NotBlank(message = "First name must not be empty.")
    @Size(max = 255, message = "First name must be less than 255 characters.")
    private String dFName;

    @NotBlank(message = "Last name must not be empty.")
    @Size(max = 255, message = "Last name must be less than 255 characters.")
    private String dLName;

    @NotBlank(message = "Specialty must not be empty.")
    private String specialty;

    @NotBlank(message = "Office number must not be empty.")
    private String officeNumber;

    public int getDid() {
        return did;
    }

    public void setDid(int did) {
        this.did = did;
    }

    public String getDFName() {
        return dFName;
    }

    public void setDFName(String dFName) {
        this.dFName = dFName;
    }

    public String getDLName() {
        return dLName;
    }

    public void setDLName(String dLName) {
        this.dLName = dLName;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getOfficeNumber() {
        return officeNumber;
    }

    public void setOfficeNumber(String officeNumber) {
        this.officeNumber = officeNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Doctor doctor = (Doctor) o;
        return did == doctor.did && Objects.equals(dFName, doctor.dFName) && Objects.equals(dLName, doctor.dLName) && Objects.equals(specialty, doctor.specialty) && Objects.equals(officeNumber, doctor.officeNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(did, dFName, dLName, specialty, officeNumber);
    }
}
