package com.superprice.deliveryms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "timeslot")
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TimeslotID")
    private int timeSlotID;

    @Column(name = "Starttime")
    private LocalTime startTime;

    @Column(name = "Endtime")
    private LocalTime endTime;

}
