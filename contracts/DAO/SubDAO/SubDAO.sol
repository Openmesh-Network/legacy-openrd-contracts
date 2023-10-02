// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {PluginUUPSUpgradeable, IDAO} from "@aragon/osx/core/plugin/PluginUUPSUpgradeable.sol";
import {IHats} from "../../Deps/hats-protocol/Interfaces/IHats.sol";
import {ISubDAO, DAOFactory, MANAGE_SUBDAO_PERMISSION_ID} from "./ISubDAO.sol";

contract SubDAO is PluginUUPSUpgradeable, ISubDAO {
    mapping(uint256 => address) private subDAOs;
    uint256 private subDAOCount;

    /// @notice Initialize the TaskDisputes plugin.
    /// @param _dao The dao where this plugin is installed.
    function initialize(IDAO _dao) external initializer {
        __PluginUUPSUpgradeable_init(_dao);
    }

    /// @inheritdoc PluginUUPSUpgradeable
    function supportsInterface(
        bytes4 _interfaceId
    ) public view virtual override returns (bool) {
        return
            _interfaceId == type(ISubDAO).interfaceId ||
            super.supportsInterface(_interfaceId);
    }

    /// @inheritdoc ISubDAO
    function createSubDAO(
        DAOFactory _daoFactory,
        DAOFactory.DAOSettings calldata _daoSettings,
        DAOFactory.PluginSettings[] calldata _pluginSettings
    ) external auth(MANAGE_SUBDAO_PERMISSION_ID) {
        IDAO subDAO = _daoFactory.createDao(_daoSettings, _pluginSettings);
        _addSubDAO(address(subDAO));
    }

    /// @inheritdoc ISubDAO
    function addSubDAO(
        address _subDAO
    ) external auth(MANAGE_SUBDAO_PERMISSION_ID) {
        _addSubDAO(_subDAO);
    }

    /// @inheritdoc ISubDAO
    function removeSubDAO(
        uint256 _index
    ) external auth(MANAGE_SUBDAO_PERMISSION_ID) {
        _removeSubDAO(_index);
    }

    /// @inheritdoc ISubDAO
    function getSubDAOCount() external view returns (uint256 count) {
        count = subDAOCount;
    }

    /// @inheritdoc ISubDAO
    function getSubDAO(uint256 _index) external view returns (address subDAO) {
        if (_index >= subDAOCount) {
            revert IndexOutOfBound(_index, subDAOCount);
        }

        subDAO = subDAOs[_index];
    }

    /// @inheritdoc ISubDAO
    function getSubDAOs() external view returns (address[] memory subDAOArray) {
        subDAOArray = new address[](subDAOCount);
        for (uint i; i < subDAOArray.length; ) {
            subDAOArray[i] = subDAOs[i];
            unchecked {
                ++i;
            }
        }
    }

    function _addSubDAO(address _subDAO) internal {
        subDAOs[subDAOCount] = _subDAO;
        ++subDAOCount;
    }

    function _removeSubDAO(uint256 _index) internal {
        if (_index >= subDAOCount) {
            revert IndexOutOfBound(_index, subDAOCount);
        }

        --subDAOCount;
        if (_index != subDAOCount) {
            // No need to swap when removing last element
            subDAOs[_index] = subDAOs[subDAOCount];
        }
    }

    /// @dev This empty reserved space is put in place to allow future versions to add new
    /// variables without shifting down storage in the inheritance chain.
    /// https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;
}
