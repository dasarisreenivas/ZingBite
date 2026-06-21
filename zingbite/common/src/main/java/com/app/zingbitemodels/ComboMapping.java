package com.app.zingbitemodels;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "combo_mappings")
public class ComboMapping implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MAPPINGID", nullable = false)
    private int mappingId;

    @Column(name = "COMBOMENUID", nullable = false)
    private int comboMenuId;

    @Column(name = "CONSTITUENTMENUID", nullable = false)
    private int constituentMenuId;

    public ComboMapping() {
    }

    public ComboMapping(int comboMenuId, int constituentMenuId) {
        this.comboMenuId = comboMenuId;
        this.constituentMenuId = constituentMenuId;
    }

    public int getMappingId() { return mappingId; }
    public void setMappingId(int mappingId) { this.mappingId = mappingId; }

    public int getComboMenuId() { return comboMenuId; }
    public void setComboMenuId(int comboMenuId) { this.comboMenuId = comboMenuId; }

    public int getConstituentMenuId() { return constituentMenuId; }
    public void setConstituentMenuId(int constituentMenuId) { this.constituentMenuId = constituentMenuId; }
}
