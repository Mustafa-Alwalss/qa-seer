package com.mustafa.qa_seer.domain.entity;

public class UserSelectedExpiryDate {
    public boolean isItInMinutes   ;
    public int     amount          ;

    public UserSelectedExpiryDate(boolean isItInMinutes, int amount) {
        this.isItInMinutes = isItInMinutes;
        this.amount = amount;
    }
}
