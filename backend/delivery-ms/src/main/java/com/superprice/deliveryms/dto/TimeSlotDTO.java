package com.superprice.deliveryms.dto;

import lombok.*;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TimeSlotDTO {

    private int timeSlotId;
    private LocalTime startTime;
    private LocalTime endTime;
}
