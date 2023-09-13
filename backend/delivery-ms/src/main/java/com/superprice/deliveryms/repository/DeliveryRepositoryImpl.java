package com.superprice.deliveryms.repository;

import com.superprice.deliveryms.model.Delivery;
import com.superprice.deliveryms.service.DeliveryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Repository
public class DeliveryRepositoryImpl implements DeliveryRepository{
    private final JdbcTemplate jdbcTemplate;

    private DataSource source;

    @Autowired
    public DeliveryRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        source = this.jdbcTemplate.getDataSource();
    }
    private Delivery extractDelivery(ResultSet rs) throws SQLException {

        return new Delivery(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getInt(5));
    }
    @Override
    public Optional<Delivery> findById(int orderNo) {
        try {
            Connection connection = source.getConnection();
            PreparedStatement stm = connection.prepareStatement(
                    "SELECT * FROM deliveries WHERE orderId = ?");
            stm.setLong(1, orderNo);
            ResultSet rs = stm.executeQuery();
            if (rs.next()) {
                return Optional.of(extractDelivery(rs));
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new RuntimeException("Error in findById", e);
        }
    }
}
