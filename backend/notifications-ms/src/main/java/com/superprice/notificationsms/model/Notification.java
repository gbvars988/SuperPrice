package com.superprice.notificationsms.model;

public class Notification {
    private String title;
    private String message;
    private String type;
    private int notificationID;

    public Notification(String title, String message, String type, int notificationID) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.notificationID = notificationID;
    }

    public String getTitle() {return title;}

    public String getMessage() {return message;}

    public String getType() {return type;}

    public int getNotificationID() {return notificationID;}
}
