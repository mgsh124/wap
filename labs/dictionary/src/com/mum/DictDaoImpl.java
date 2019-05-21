package com.mum;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DictDaoImpl {
    public List searchTerm(String term) {
        List<DictModel> data = new ArrayList<>();

        JDBCConnection jdbcConnection = new JDBCConnection();

        try (Connection connection = jdbcConnection.getConnection()) {
            try {
                String query = "SELECT * FROM entries WHERE word LIKE ?";
                PreparedStatement ps = connection.prepareStatement(query);
                ps.setString(1, term);
//                System.out.println("query " + ps);
                ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    DictModel dictModel = new DictModel();
                    dictModel.setWord(rs.getString("word"));
                    dictModel.setWordType(rs.getString("wordtype"));
                    dictModel.setDefinition(rs.getString("definition"));
                    data.add(dictModel);
                }
                rs.close();
                rs = null;
                ps.close();
                ps = null;
//                System.out.println("list " + data.toString());
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return data;
    }
}
